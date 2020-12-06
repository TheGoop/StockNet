from database.payloadClasses.userprofileentry import UserProfileEntry
from database.utils import queryutils
from datetime import timezone, datetime

def createUserProfile(db, username):
    joinDate = datetime.now(tz=timezone.utc).timestamp()
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
    if userProfile:
        return 1
    
    userProfile = UserProfileEntry(joinDate)
    #create userProfile
    try:
        queryutils.storeUserProfile(db, username, userProfile)
    except Exception:
        return 4

    return 0

    
def favoriteStock(db, body):
    if 'username' in body and 'ticker' in body:
        username = body['username']
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
            queryutils.updateUserProfile(db, username, update_dict)
        except KeyError:
            return 5
        except Exception:
            return 6
    
        return 0

    #else the ticker is already in user favorite stocks, 
    # don't do anything just return 1
    else:
        '''
        for i in range(len(userProfile.favStocks)):
            if userProfile.favStocks[i] == "ticker":
                userProfile.favStocks.pop(i)
                break
        
        update_dict = dict()
        update_dict["favStocks"] = userProfile.favStocks

        try:
            queryutils.updateUserProfile(update_dict)
        except KeyError:
            return 7
        except Exception:
            return 8
            '''
        return 1


