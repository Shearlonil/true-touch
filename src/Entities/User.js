const _userProps = new WeakMap();

export default class User {
    constructor(decodedToken) {
        if (decodedToken) {
            const { whom } = decodedToken;
            _userProps.set(this, {
                id: whom.id,
                nano_id: whom.nano_id,
                firstName: whom.fname,
                lastName: whom.lname,
                status: whom.status,
                email: whom.email,
                phone: whom.phone,
                mode: whom.mode,
                regDate: whom.regDate,
                roles: whom.roles,
            });
        }
    }

    get id() { return _userProps.get(this).id }
    set id(id) { _userProps.get(this).id = id }

    get nano_id() { return _userProps.get(this).nano_id }
    set nano_id(nano_id) { _userProps.get(this).nano_id = nano_id }

    get firstName() { return _userProps.get(this).firstName }
    set firstName(firstName) { _userProps.get(this).firstName = firstName }

    get lastName() { return _userProps.get(this).lastName }
    set lastName(lastName) { _userProps.get(this).lastName = lastName }

    get status() { return _userProps.get(this).status }
    set status(status) { _userProps.get(this).status = status }

    get email() { return _userProps.get(this).email }
    set email(email) { _userProps.get(this).email = email }

    get phone() { return _userProps.get(this).phone }
    set phone(phone) { _userProps.get(this).phone = phone }

    get mode() { return _userProps.get(this).mode }
    set mode(mode) { _userProps.get(this).mode = mode }

    get regDate() { return _userProps.get(this).regDate }
    set regDate(regDate) { _userProps.get(this).regDate = regDate }
    
    get authorities() {
        return auths(_userProps.get(this));
    }

    hasAuth(authCode){
        return auths(_userProps.get(this)).includes(authCode);
    }
}

const auths = (userProps) => {
    if(userProps.roles){
        return userProps.roles;
    }
    return [];
}