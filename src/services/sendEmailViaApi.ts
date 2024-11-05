export const sendEmailViaApi = async (
    senderId: string,  // L'identifiant de l'expéditeur
    userId: string,    // L'identifiant de l'utilisateur
    subject: string,   // Le sujet de l'email
    receiver: string,  // L'adresse e-mail du destinataire
    message: string    // Le message de l'email
): Promise<void> => {
    const url = "http://84.247.170.134:7051/api/v1/broker/publish/email";

    const jsonInputString = {
        senderId,
        userId,
        resourceIds: "1,1,4",
        subject,
        receivers: [receiver],
        message
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonInputString)
        });

        if (!response.ok) {
            console.log("Erreur lors de l'envoi de l'email : " + response.status);
        }
    } catch (error) {
        console.error("Une erreur est survenue lors de l'envoi de l'email :", error);
    }
};
