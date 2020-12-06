from database.payloadClasses.userprofileentry import UserProfileEntry
from database.utils import queryutils


def createUserProfile(db, body):
    if 'username' in body and 'joinDate' in body:
        username = body['username']
        joinDate = body['joinDate']
    else:
        return 2
    
    userProfile = None
    try: 
        userProfile = queryutils.fetchUserProfile(db, username)
    #if the user profile is not found, this is good
    except KeyError:
        #at some point, should use a validate call 
        # instead of testing keyerror
        pass
    except Exception:
        return 3
    
    #if theres something in the userProfile var, then we can't 
    #create a user profile for this because it already exists
    if not userProfile:
        return 1
    

    #create userProfile
    userProfile = UserProfileEntry.from_dict(body)
    try:
        queryutils.storeUserProfile(db, username, userProfile)
    except Exception:
        return 4

    return 0

    
def favoriteStock(db, body):
    if 'username' in body and 'ticker' in body:
        username = body['ticker']
        ticker = body['ticker']
    else:
        return 2
    

    userProfile = None
    try: 
        userProfile = queryutils.fetchUserProfile(db, username)
    #if the user profile is not found, this is good
    except KeyError:
        #at some point, should use a validate call 
        # instead of testing keyerror
        pass
    except Exception:
        return 3
    # if we didn't find user
    if not userProfile:
        return 4
    # if the ticker isn't already in the users favorite stocks, add it
    if ticker not in userProfile.favStocks:
        userProfile.favStocks.append(ticker)
    
        update_dict = dict()
        update_dict["favStocks"] = userProfile.favStocks
        try:
            queryutils.updateUserProfile(update_dict)
        except KeyError:
            return 5
        except Exception:
            return 6
    
        return 0

    #else the ticker is already in user favorite stocks, 
    # don't do anything just return 1
    else:
        return 1



