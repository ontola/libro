RAND=$(cat /dev/urandom | LC_CTYPE=C tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
PTAG=${CI_BUILD_REF_NAME:=$TAG}
TAG=${PTAG:-$RAND}
echo Building image as "$TAG"

mkdir -p tmp/dist tmp/static

npm run build

cp -R ./{package.json,Dockerfile,dist,static} ./tmp
cd tmp && docker build --pull=true -t registry.gitlab.com/argu/aod_demo:${TAG} .

cd .. && rm -Rf tmp/
