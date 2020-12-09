from database.payloadClasses.authenticationEntry import AuthenticationEntry
from database.payloadClasses.userprofileentry import UserProfileEntry
from database.utils import queryutils
from datetime import timezone, datetime

def createUser(db, body):
    if 'username' in body and 'password' in body:
        username = body['username']
        password = body['password']
    
    else:
        # if either username or password not given in body
        return 2
    
    result = None
    '''
    Before trying to create an account for the user, must 
    see if their username is already taken to prevent
    multiple users with same name.
    '''
    try:
        result = queryutils.fetchAuthentication(db, username)
    # when a keyerror is thrown, that means that the username
    # was not found/reserved, so then the user can proceed 
    # and use it
    except KeyError:
        pass
    except Exception:
        return 3

    #if result is not None, then it contains something from db
    #meaning that the username is reserved
    if result:
        return 1
    '''
    Now proceed with creating an account with that username
    and password
    '''
    userAuth = AuthenticationEntry(password)

    joinDate = datetime.now(tz=timezone.utc).timestamp()
    userProfile = UserProfileEntry(joinDate)
    try:
        queryutils.storeAuthentication(db, username, userAuth)
        queryutils.storeUserProfile(db, username, userProfile)
    except Exception:
        return 4
    
    return 0


def is_valid_login(db, body):
    if 'username' in body and 'password' in body:
        username = body['username']
        password = body['password']
    
    else:
        # if either username or password not given in body
        return 3

    try:
        authEntry = queryutils.fetchAuthentication(db, username)
    #if the username is not found, will throw KeyError
    except KeyError:
        return 2
    #Undefined Behavior
    except Exception:
        return 4

    #Return 0 to authenticate user,
    if (authEntry.password == password):
        return 0
    #return 1 if user given bad password
    else:
        return 1

