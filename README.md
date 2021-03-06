# Bed for Breakfast

## First Time Setup

1. Install top level dependencies: ```npm install```

2. Install other dependencies: ```npm run bootstrap```

3. Start everything in 'dev mode': ```npm run start:dev```

## Folder Structure

- frontend: React project
- backend: Nest.js project
- shared: Any shared typescript models and utility functions

# Graph-Ql Queries

## Requesting:

### Send Request:

```
mutation {
  createRequest(
    createRequestDto: {
      start: "2020-01-01"
      end: "2020-10-01"
      description: "fvzfuz"
      receiver: "5d2e4f790000f5471085c4d9"
    }
  ) {
    start
    end
    description
    requestStatus
    receiver {
      email
    }
    proposer {
      firstName 
      email
    }
  }
}
```

### Update Request 
-> only change requestStatus: 'REQUESTED' | 'ACCEPTED' | 'CANCELLED' | 'DENIED'
```
mutation {
  updateRequestStatus(
    updateRequestStatusDto: {
      _id: "5d305505fee6575d74d0ca51"
      requestStatus: ACCEPTED
    }
  ) {
    start
    end
    description
    requestStatus
    ratings {
      description
      request {
        _id
        description
      }
      receiverRole
      rating
      author {
        firstName
      }
    }
  }
}
```

### Request possible 

Query that has user id , id of host he wants to request, REQUESTED field
=> if this query returns true you cant request this accomodation again
=> one user cant request another user:host if he has requested him already and host has not yet answered (set the requestStatus to DENIED, CANCELED or ACCEPTED)

```
query {
canBeRequested(
    canBeRequestedDto: {
      hostId: "5d2e4f790000f5471085c4d9"
    }
  ) 
}
```




## Rating and Reference:

### Submit Rating:

It is possible that one person has to positive ratings from the same person because the person rated to trips with this host positive!

```
mutation {
  createRating(
    createRatingDto: {
      request: "5d30577180496764c0dffa6b"
      description: "myrating"
      rating: true
    }
  ) {
    _id
    description
    requestStatus
  }
}
```

### Get ratings rating user x: 

receivedRatings query needs userId of user x as a field
```
query {
  receivedRatings (userId: "5d2effa567a4f511e4f4d7d5" ) {
    _id
    description
    receiverRole
    rating
    receiver {
      _id
    }
    request {
      _id
      start
      end
      description
      requestStatus
      ratings {
        _id
      }
    }
    author {
      _id
      firstName
    }
  }
}
```

### Submit TripReport:

```
mutation {
  createTripReport(
    createTripReportDto: {
      request: "5d31cba1963a8feb6fe28184"
      description: "It was great"
      pictures: []
      
    }
  ) {
    _id
    description
    requestStatus
  }
}
```

### like trip report:
only possible as logged in user

```
mutation {
  likeTripReport (likeTripReportDto: {_id: "5d349300548bc52864de1f39"}) {
     _id
    likedBy {_id}
    description
  	pictures
  }
}
```



## User:

get users meals as list of meals in user query

### GetUsers:

```
query {
  users {
    _id
    firstName
    lastName
    email
    phoneNumber
    firstName
    lastName
    birthday
    gender
    profilePicture
    homeTown
    homeCountry
    favoriteFood
    dislikedBy {
      firstName
      email
    }
    likedBy {
      firstName
      email
    }
    accommodation {
      _id
      isActive
    }
  }
}
```

## Notifications:

### Get unseen requests you send:

- request should be answered
- unseen
- in the future
- proposed by logged in user

```
query {
  proposedUnseeAnsweredRequests {
    _id
    start
    end
    description
    requestStatus
    receiver {
      _id
      email
    }
  }
}
```

### update it as seen:

```
mutation {
  updateRequestAsSeen (requestSeenDto: {_id: "5d349dc40a654235b815b18a"}){
    _id
    start
    end
    description
    requestStatus
    receiver {
      _id
      email
    }
    notificationSeen
  }
}
```


### Received requests

Requests send to you which not have been updated as DENIED, CANCELED or ACCEPTED
- current user is receiver

```
query {
  receivedRequestedRequests {
    _id
    start
    end
    description
    requestStatus
    receiver {
      _id
    }
    proposer {
      _id
    }
    ratings {
      description
      request {
        _id
        description
      }
      receiverRole
      rating
      author {
        firstName
      }
    }
  }
}
```



### requests to rate:

- in the past
- you are receiver/proposer
- you have not yet rated
- the request was accepted by host
- 
```
query {
  acceptedUnratedPastRequests {
    _id
    start
    end
    description
    requestStatus
    receiver {
      _id
      email
    }
  }
}
```

## Meals:

### TestMealCreation:

inserts default meals for logged in user

```
mutation {
  createTestMeals {
    _id
    firstName
    lastName
    email
    phoneNumber
    firstName
    lastName
    birthday
    gender
    profilePicture
    homeTown
    homeCountry
    favoriteFood
    dislikedBy {
      firstName
      email
    }
    likedBy {
      firstName
      email
    }
    accommodation {
      _id
    }
    meals {
      description
    }
  }
}
```
