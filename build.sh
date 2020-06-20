VERSION=$(cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')
IMAGE_NAME="serverless-function"

# Building
echo 'Building '${IMAGE_NAME}' version '$VERSION'...'
docker build -t $DOCKER_HUB_ACCOUNT/$IMAGE_NAME:$VERSION .

# Deploy
# echo 'Deploying '$DOCKER_HUB_ACCOUNT/$IMAGE_NAME' version '$VERSION'...'
# docker login --username=$DOCKER_HUB_ACCOUNT --password=$DOCKER_HUB_PASSWORD
# docker push $DOCKER_HUB_ACCOUNT/$IMAGE_NAME:$VERSION
