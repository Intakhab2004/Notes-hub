export const resetPasswordTemplate = (email: string, randomUID: string): string => {
    return (
        `
        <div style="display: none; max-height: 0px; overflow: hidden;">
            Reset your NotesHub account password by clicking the link below.
        </div>

        <div style="padding: 24px;">
            <div style="margin-bottom: 16px;">
                <h2 style="font-size: 24px; font-weight: bold; margin: 0;">Hello ${email},</h2>
            </div>

            <div style="margin-bottom: 16px;">
                <p style="font-size: 16px; line-height: 1.5; margin: 0;">
                    We received a request to reset your password for your NotesHub account. 
                    Please click the button below to set a new password:
                </p>
            </div>

            <div style="margin-top: 20px; margin-bottom: 20px;">
                <a href="http://localhost:3000/set-password/${randomUID}"
                    style="display: inline-block; padding: 10px 20px; background-color: #61dafb; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                    Reset Password
                </a>
            </div>

            <div style="margin-bottom: 16px;">
                <p style="font-size: 16px; line-height: 1.5; margin: 0;">
                    If you did not request this, you can safely ignore this email. 
                    Your password will not be changed unless you access the link above.
                </p>
            </div>
        </div>
        <p style="font-size: 12px; color: #9ca3af; margin-top: 16px;">© 2025 NotesHub. All rights reserved.</p>
        `
    )
}
