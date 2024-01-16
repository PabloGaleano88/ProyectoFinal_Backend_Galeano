export const usersDTO = (user) =>{
    
    const userDTO = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role
    }

    return userDTO
}

export const usersViewDTO = (user) =>{
    
    const userDTO = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
        id: user._id,
        last_connection: user.last_connection
    }
    if(user.documents){
        const ppic = user.documents.find(p=> p.name === "profilePic")
        if(ppic){
            const picReference = ppic.reference
            userDTO.profilePic = picReference
        }
    }
    return userDTO
}