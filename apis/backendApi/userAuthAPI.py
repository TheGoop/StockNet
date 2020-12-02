from database.payloadClasses.authenticationEntry import AuthenticationEntry
from database.utils import queryutils

def createUserAuth(db, body):
    if 'username' in body and 'password' in body:
        username = body['username']
        password = body['password']
    
    else:
        # if either username or password not given in body
        return 1
    
    result = None
    '''
    Before trying to create an account for the user, must 
    see if their username is already taken to prevent
    multiple users with same name.
    '''
    try:
        result = queryutils.fetchAuthentication(db, username)
    except KeyError:
        pass
    except Exception:
        return 3

    if result:
        return 1
    '''
    Now proceed with creating an account with that username
    and password
    '''
    userAuth = AuthenticationEntry(password)
    try:
        queryutils.storeAuthentication(db, username, userAuth)
    except Exception:
        return 3
    
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

