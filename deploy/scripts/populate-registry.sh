#!/bin/bash

REGISTRY_URL="localhost:5000"
IMAGES=(
    "nginx:1.25"
    "nginx:latest"
    "alpine:3.20"
    "alpine:latest"
    "busybox:latest"
    "caddy:2.7.6"
    "caddy:latest"
    "redis:7.2"
    "redis:latest"
    "node:20"
    "node:latest"
    "python:3.12"
    "python:latest"
)

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed or not in PATH"
    exit 1
fi

log_info "Checking registry accessibility at $REGISTRY_URL..."
if ! curl -s "http://$REGISTRY_URL/v2/" > /dev/null; then
    log_warning "Registry $REGISTRY_URL is not accessible. Make sure it's running."
    log_info "To start a local registry: docker run -d -p 5001:5000 --name registry registry:2"
fi

TOTAL_IMAGES=${#IMAGES[@]}
SUCCESS_COUNT=0
FAILED_IMAGES=()

log_info "Starting push process for $TOTAL_IMAGES images to $REGISTRY_URL"
echo "=================================================="

for i in "${!IMAGES[@]}"; do
    IMAGE="${IMAGES[$i]}"
    CURRENT=$((i + 1))
    
    NAME="${IMAGE%%:*}"
    TAG="${IMAGE#*:}"
    LOCAL_TAG="${REGISTRY_URL}/${NAME}:${TAG}"
    
    echo
    log_info "[$CURRENT/$TOTAL_IMAGES] Processing $IMAGE"
    echo "--------------------------------------------------"
    
    log_info "Pulling $IMAGE..."
    if docker pull "$IMAGE"; then
        log_success "Pull successful for $IMAGE"
    else
        log_error "Pull failed for $IMAGE"
        FAILED_IMAGES+=("$IMAGE")
        continue
    fi
    
    log_info "Tagging $IMAGE to $LOCAL_TAG..."
    if docker tag "$IMAGE" "$LOCAL_TAG"; then
        log_success "Tag successful: $LOCAL_TAG"
    else
        log_error "Tag failed for $IMAGE"
        FAILED_IMAGES+=("$IMAGE")
        continue
    fi
    
    log_info "Pushing $LOCAL_TAG..."
    if docker push "$LOCAL_TAG"; then
        log_success "Push successful for $LOCAL_TAG"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
        log_error "Push failed for $LOCAL_TAG"
        FAILED_IMAGES+=("$IMAGE")
        continue
    fi
done

echo
echo "=================================================="
log_info "FINAL SUMMARY"
echo "=================================================="
log_success "Successfully processed images: $SUCCESS_COUNT/$TOTAL_IMAGES"

if [ ${#FAILED_IMAGES[@]} -gt 0 ]; then
    log_error "Failed images: ${#FAILED_IMAGES[@]}"
    for failed_image in "${FAILED_IMAGES[@]}"; do
        echo "  - $failed_image"
    done
    exit 1
else
    log_success "All images successfully pushed to $REGISTRY_URL"
fi

echo
log_info "Available images in registry:"
for IMAGE in "${IMAGES[@]}"; do
    if [[ ! " ${FAILED_IMAGES[@]} " =~ " ${IMAGE} " ]]; then
        NAME="${IMAGE%%:*}"
        TAG="${IMAGE#*:}"
        echo "  - $REGISTRY_URL/$NAME:$TAG"
    fi
done

log_success "Script completed successfully!"