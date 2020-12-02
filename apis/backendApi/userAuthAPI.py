from database.payloadClasses.authenticationEntry import AuthenticationEntry
from database.utils import queryutils

def createUserAuth(db, body):
    if 'username' in body and 'password' in body:
        username = body['username']
        password = body['password']
    
    else:
        # if either username or password not given in body
        return 3
    
    userAuth = AuthenticationEntry(password)
    try:
        queryutils.storeAuthentication(db, username, userAuth)
    except KeyError:
        return 2
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

