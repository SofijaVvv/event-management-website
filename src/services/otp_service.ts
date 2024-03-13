import speakeasy from 'speakeasy';


export async function generateOTPSecret(){
    return speakeasy.generateSecret({length: 12});
}

export async function generateOtpQRCode(secret:string, userEmail:string){
    const appName = "LgProject";
    const otpAuthUrl = `otpauth://totp/${appName}:${userEmail}?secret=${secret}&issuer=${appName}`;
    return  `https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=${otpAuthUrl}`;
}

export async function verifyUserOTP(OTP:string, userSecret:string){
    return speakeasy.totp.verify({
        secret: userSecret,
        encoding: 'base32',
        token: OTP,
        window: 6
    });
}

