type otpFn = () => number;

export const generateOtp:otpFn = () =>
{
    let otp = Math.random();
    otp = otp*1000000;
    otp = parseInt(String(otp));
    return otp
};

