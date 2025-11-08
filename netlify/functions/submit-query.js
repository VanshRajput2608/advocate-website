// submit-query.js
const fetch = require("node-fetch"); // optional if using WhatsApp API

exports.handler = async function(event, context) {
  if(event.httpMethod !== "POST"){
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, phone, queryText, urgency } = JSON.parse(event.body);

    if(!name || !queryText) {
      return { statusCode: 400, body: JSON.stringify({ success:false, message:"Missing required fields" }) };
    }

    // -------------------------
    // Example: WhatsApp / Email action (demo)
    // -------------------------
    // Using environment variables for secrets:
    // process.env.WHATSAPP_API_URL, process.env.WHATSAPP_NUMBER, process.env.EMAIL_RECIPIENT
    const whatsappNumber = process.env.WHATSAPP_NUMBER || "917082868248";
    const encodedMsg = encodeURIComponent(`New Legal Query:
Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone || "Not provided"}
Query: ${queryText}
Urgency: ${urgency}`);

    // For demo, just log instead of sending real message
    console.log("Would send WhatsApp:", whatsappNumber, encodedMsg);

    // You can integrate Twilio/WhatsApp Business API or SendGrid here using env vars

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch(err){
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ success:false, message:err.message }) };
  }
};
