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

    





    




    
    
    pass



