# eas config

1. run

```
FLAVOR=courier ENV=dev eas init
```

2. copy projectId value to EXPO_COURIER_ID on .dev.env

3. create secrets

```
cat .dev.env | grep "=" | awk -F "=" '{print "--name="$1" --value="$2}' | FLAVOR=courier ENV=dev xargs -n2 eas secret:create --force --type string
```
