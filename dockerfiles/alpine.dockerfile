FROM alpine:3.20
RUN apk add --no-cache bash git curl jq bind-tools && \
    rm -rf /var/cache/apk/*

# Final Configuration
RUN mkdir -p /app /build /builds
WORKDIR /app

# Create a non-root user and group
RUN addgroup -S ops && adduser -S runner -G ops

#Set ownership to the non-root user
RUN chown -R runner:ops /app /build /builds

# Switch to the non-root user
USER runner

# Run in the background
CMD ["tail", "-f", "/dev/null"]