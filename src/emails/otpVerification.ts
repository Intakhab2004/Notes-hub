export const otpTemplate = (otp: string, username: string): string => {
    return (
        `
        <div style="display: none; max-height: 0px; overflow: hidden;">
            Here's your verification code: ${otp}
        </div>

        <div style="padding: 24px;">
            <div style="margin-bottom: 16px;">
                <h2 style="font-size: 24px; font-weight: bold; margin: 0;">Hello ${username},</h2>
            </div>

            <div style="margin-bottom: 16px;">
                <p style="font-size: 16px; line-height: 1.5; margin: 0;">
                    Thank you for registering. Please use the following verification code to complete your registration:
                </p>
            </div>

            <div style="margin-bottom: 16px;">
                <p style="font-size: 20px; font-weight: bold; color: #1a202c; margin: 12px 0;">${otp}</p>
            </div>

            <div style="margin-bottom: 16px;">
                <p style="font-size: 16px; line-height: 1.5; margin: 0;">
                    If you did not request this code, please ignore this email.
                </p>
            </div>

            <div style="margin-top: 20px;">
                <a href="https://notes-hub-eosin.vercel.app/verify/${username}"
                    style="display: inline-block; padding: 10px 20px; background-color: #61dafb; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                    Verify here
                </a>
            </div>
        </div>
        <p style="font-size: 12px; color: #9ca3af; margin-top: 16px;">© 2025 NotesHub. All rights reserved.</p>
        `
    )
}