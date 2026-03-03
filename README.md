
# 🚀 Google Cloud Functions – Event Driven Hands-On Lab

This project demonstrates how to build and test **event-driven Cloud Functions (Gen2)** on Google Cloud.

## 📦 What This Repo Covers

1. Pub/Sub Trigger Function  
2. Cloud Storage Trigger Function  
3. Firestore Trigger Function  
4. Deployment commands  
5. Testing steps  
6. Cleanup steps  

---

# 🧠 Architecture Overview

Event → Google Service → Cloud Function → Cloud Logging

- Pub/Sub message → Function runs  
- File upload → Function runs  
- Firestore document write → Function runs  

---

# ✅ Prerequisites

- Google Cloud SDK installed
- Authenticated via `gcloud auth login`
- Project selected via `gcloud config set project PROJECT_ID`

Enable APIs:

```
    gcloud services enable cloudfunctions.googleapis.com \
    eventarc.googleapis.com \
    pubsub.googleapis.com \
    firestore.googleapis.com \
    storage.googleapis.com
```

---

# 1️⃣ Pub/Sub Trigger

## Create Topic

```
    gcloud pubsub topics create orders-topic
```

## Deploy Function

```
    cd pubsub-function

    gcloud functions deploy pubsub-function --gen2 --runtime=nodejs20 --region=us-central1 --entry-point=pubsubHandler --trigger-topic=orders-topic
```

## Test

```
    gcloud pubsub topics publish orders-topic --message="New order received"
```

Check logs:

```
    gcloud functions logs read pubsub-function --region=us-central1
```

---

# 2️⃣ Storage Trigger

## Create Bucket

```
    gsutil mb -l us-central1 gs://YOUR_UNIQUE_BUCKET_NAME
```

## Deploy Function

```
    cd storage-function

    gcloud functions deploy storage-function --gen2 --runtime=nodejs20 --region=us-central1 --entry-point=storageHandler --trigger-event-filters="type=google.cloud.storage.object.v1.finalized" --trigger-event-filters="bucket=YOUR_UNIQUE_BUCKET_NAME"
```

## Test

```
    echo "hello world" > test.txt
    gsutil cp test.txt gs://YOUR_UNIQUE_BUCKET_NAME
```

---

# 3️⃣ Firestore Trigger

Ensure Firestore is created in Native mode:

```
    gcloud firestore databases create --region=us-central1
```

## Deploy Function

```
    cd firestore-function

    gcloud functions deploy firestore-function --gen2 --runtime=nodejs20 --region=us-central1 --entry-point=firestoreHandler --trigger-event-filters="type=google.cloud.firestore.document.v1.written" --trigger-event-filters="database=(default)" --trigger-event-filters-path-pattern="document=users/{userId}"
```

## Test

    ```
    gcloud firestore documents create users/user1 --fields=name=Sarfaraz,age=30
```

---

# 🧹 Cleanup

```
    gcloud functions delete pubsub-function --region=us-central1
    gcloud functions delete storage-function --region=us-central1
    gcloud functions delete firestore-function --region=us-central1

    gcloud pubsub topics delete orders-topic
    gsutil rm -r gs://YOUR_UNIQUE_BUCKET_NAME
```

---

# 🏗 Real-World Use Cases

- Order processing (Pub/Sub)
- Image processing (Storage trigger)
- Audit logging / notifications (Firestore trigger)

---

## Author
Mohd Sarfaraz Alam