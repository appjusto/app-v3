# eas config

1. run

```
FLAVOR=courier ENV=dev eas init
```

2. copy projectId value to EXPO_COURIER_ID on .dev.env

3. create string secrets

```
cat .dev.env | grep "=" | awk -F "=" '{print "--name="$1" --value="$2}' | FLAVOR=courier ENV=dev xargs -n2 eas secret:create --force --type string
```

4. create file secrets

`GOOGLE_SERVICES_JSON`: upload google-services.json
`GOOGLE_SERVICES_CONSUMER_PLIST`: upload GoogleService-Info.plist

# dev client config

1. build dev client

```
ENV=dev FLAVOR=consumer DISTRIBUTION=devclient PLATFORM=ios npm run build
```

2. unpack and drag the app on the simulator

3. run

```
FLAVOR=consumer ENV=dev npm run dev
```

#
