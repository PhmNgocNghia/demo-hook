const authenticate = (userName, passWord) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (userName === 'admin' && passWord === '123456') {
                resolve({
                    userName: 'phmngocnghia',
                })
            }
    
            reject('Wrong userName or passWord')
        }, 1000)
    })
}

export default authenticate