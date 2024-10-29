"use strict";
// emailTemplates.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmailNotificationHTML = void 0;
const createEmailNotificationHTML = (username, commandeId, conducteurName, pointPriseEnCharge, pointDepot, dateHeureDepart, dateHeureArrivee, yourName, companyName, contactInfo, websiteUrl) => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validation de Votre Course</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            margin: 0 auto;
            width: 80%;
            max-width: 600px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        a {
            color: #0066cc;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>Cher(e) ${username},</p>
        <p>Nous espérons que vous allez bien.</p>
        <p>Nous avons le plaisir de vous informer que votre demande de course a été validée par le conducteur. Voici les détails de votre course :</p>
        <ul>
            <li><strong>Numéro de Commande</strong> : ${commandeId}</li>
            <li><strong>Conducteur</strong> : ${conducteurName}</li>
            <li><strong>Point de Prise en Charge</strong> : ${pointPriseEnCharge}</li>
            <li><strong>Point de Dépôt</strong> : ${pointDepot}</li>
            <li><strong>Date et Heure de Départ</strong> : ${dateHeureDepart}</li>
            <li><strong>Date et Heure d’Arrivée Estimée</strong> : ${dateHeureArrivee}</li>
        </ul>
        <p>Nous vous remercions pour votre confiance et nous nous réjouissons de vous offrir une expérience de transport agréable. Si vous avez des questions ou si vous avez besoin d'assistance supplémentaire, n'hésitez pas à nous contacter.</p>
        <p>En attendant, nous vous souhaitons un excellent trajet !</p>
        <p>Cordialement,<br>
        <strong>${yourName}</strong><br>
        ${companyName}<br>
        ${contactInfo}<br>
        <a href="${websiteUrl}">${websiteUrl}</a></p>
    </div>
</body>
</html>
`;
exports.createEmailNotificationHTML = createEmailNotificationHTML;
//# sourceMappingURL=EmailNotification.js.map