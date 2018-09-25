var os = require('os');

function getLocalIp() {
    if (process.env.LOCAL_IP) {
        return process.env.LOCAL_IP;
    }
    var ifaces = os.networkInterfaces();
    // console.log('ifaces----', ifaces);

    var found = null;
    Object.keys(ifaces).forEach((ifname) => {
        if (found) {
            return;
        }

        ifaces[ifname].filter((iface) => {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return;
            }

            found = iface.address;
        });
    });

    return found || '127.0.0.1';
    
}

module.exports = getLocalIp;