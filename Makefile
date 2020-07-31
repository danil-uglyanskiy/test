.PHONY: help dev build

IMAGE=registry.gitlab.com/overteam/telemed/tm-admin-web

help:
	@echo 'Available targets:'
	@echo '  make dev'
	@echo '  make build_prod'
	@echo '  make build_demo'

dev:
	docker-compose up --build

build_prod:
	docker build -f Dockerfile.production -t ${IMAGE}:latest .
	docker push ${IMAGE}:latest

build_demo:
	docker build -f Dockerfile.production -t ${IMAGE}:demo .
	docker push ${IMAGE}:demo
