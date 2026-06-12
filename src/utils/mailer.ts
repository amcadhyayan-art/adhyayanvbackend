import nodemailer from 'nodemailer';

// Configure SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

export const sendReceiptEmail = async (registration: any) => {
  const { userDetails, itemsSelected, payment } = registration;

  if (!userDetails || !payment) {
    console.error('Mailer Error: userDetails or payment info is missing from registration.');
    return;
  }

  // Render HTML list of items safely
  const workshopsList = ((itemsSelected && itemsSelected.workshops) || [])
    .filter((w: any) => w && w.title)
    .map((w: any) => `<li><strong>Workshop:</strong> ${w.title}</li>`)
    .join('');

  const compsList = ((itemsSelected && itemsSelected.competitions) || [])
    .filter((c: any) => c && c.title)
    .map((c: any) => `<li><strong>Competition:</strong> ${c.title}</li>`)
    .join('');

  const accDetails = (itemsSelected && itemsSelected.accommodation && itemsSelected.accommodation.option && itemsSelected.accommodation.option.type)
    ? `<li><strong>Accommodation:</strong> ${itemsSelected.accommodation.option.type} (${itemsSelected.accommodation.days || 1} Days)</li>`
    : '';

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #0284c7; margin-bottom: 4px; font-size: 28px;">ADHYAYAN 2026</h1>
        <p style="color: #64748b; font-size: 14px; text-transform: uppercase; tracking-wider; margin-top: 0;">Andhra Medical College, Visakhapatnam</p>
      </div>
      
      <div style="border-top: 4px solid #0284c7; padding-top: 16px;">
        <h2 style="color: #0f172a; margin-bottom: 12px; font-size: 18px;">Registration Confirmed!</h2>
        <p style="color: #334155; font-size: 15px; line-height: 1.6;">Dear <strong>${userDetails.fullName || 'Participant'}</strong>,</p>
        <p style="color: #334155; font-size: 15px; line-height: 1.6;">Thank you for registering for Adhyayan 2026. Your payment of <strong>INR ${payment.amount || 0}</strong> was processed successfully.</p>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <h3 style="color: #0f172a; font-size: 16px; margin-top: 0; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">Order Details</h3>
        <ul style="list-style: none; padding-left: 0; margin-bottom: 0; color: #334155; font-size: 14px; line-height: 1.8;">
          <li><strong>Ticket ID:</strong> ${registration._id}</li>
          <li><strong>Payment ID:</strong> ${payment.paymentId || 'N/A'}</li>
          <li><strong>College:</strong> ${userDetails.college || 'N/A'}</li>
          ${workshopsList}
          ${compsList}
          ${accDetails}
        </ul>
      </div>

      <p style="color: #64748b; font-size: 13px; line-height: 1.5; text-align: center; margin-top: 32px;">
        Please carry a printout or show a digital copy of this email at the registration desk upon arrival.
      </p>
    </div>
  `;

  const mailOptions = {
    from: process.env.SMTP_FROM || 'Adhyayan 2026 <amcadhyayan@gmail.com>',
    to: userDetails.email,
    subject: 'Adhyayan 2026 - Registration & Payment Success Receipt',
    text: `Hello ${userDetails.fullName || 'Participant'},\n\nYour registration for Adhyayan 2026 has been successfully confirmed!\n\nOrder Details:\n- Ticket ID: ${registration._id}\n- Payment ID: ${payment.paymentId || 'N/A'}\n- College: ${userDetails.college || 'N/A'}\n\nPlease carry a printout or show a digital copy of this email at the registration desk upon arrival.`,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${userDetails.email}. MessageId: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};
