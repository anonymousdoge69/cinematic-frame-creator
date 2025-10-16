import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MeetingRequest {
  name: string;
  email: string;
  timeSlot: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, timeSlot }: MeetingRequest = await req.json();

    // Generate a meeting link (you can replace this with actual Google Meet/Zoom integration)
    const meetingLink = `https://meet.google.com/your-meeting-room`;
    
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "FrameState <onboarding@resend.dev>",
        to: [email],
        subject: "Your Real Estate Video Consultation Meeting",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #f1c40f;">Meeting Confirmed!</h1>
            <p>Hi ${name},</p>
            <p>Thank you for scheduling a consultation with FrameState. We're excited to discuss your real estate video production needs!</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0;">Meeting Details</h2>
              <p><strong>Preferred Time:</strong> ${timeSlot}</p>
              <p><strong>Duration:</strong> 15 minutes</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${meetingLink}" 
                 style="background: #f1c40f; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Join Meeting
              </a>
            </div>

            <p style="color: #666; font-size: 14px;">
              We'll also send you a WhatsApp message with the meeting details.
            </p>

            <p>Looking forward to speaking with you!</p>
            <p><strong>The FrameState Team</strong></p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Failed to send email: ${error}`);
    }

    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true, meetingLink }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-meeting-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
