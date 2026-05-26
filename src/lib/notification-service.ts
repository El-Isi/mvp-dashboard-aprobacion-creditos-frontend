/**
 * Cliente para el notification-service de Konfío.
 * Envía emails transaccionales y SMS.
 *
 * @see https://notifications.konfio.mx/api/v1
 */

interface EmailNotification {
  to: string;
  subject: string;
  template: string;
  data: Record<string, string | number>;
}

interface SmsNotification {
  to: string;
  message: string;
}

const NOTIFICATIONS_URL = process.env.NOTIFICATIONS_URL;
const NOTIFICATIONS_API_KEY = process.env.NOTIFICATIONS_API_KEY;

function getHeaders(token: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'x-api-key': NOTIFICATIONS_API_KEY!,
  };
}

export async function sendEmail(
  token: string,
  notification: EmailNotification
): Promise<void> {
  const response = await fetch(`${NOTIFICATIONS_URL}/notifications/email`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(notification),
  });

  if (!response.ok) {
    throw new Error(
      `Notification email failed: ${response.status} ${response.statusText}`
    );
  }
}

export async function sendSms(
  token: string,
  notification: SmsNotification
): Promise<void> {
  const response = await fetch(`${NOTIFICATIONS_URL}/notifications/sms`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(notification),
  });

  if (!response.ok) {
    throw new Error(
      `Notification SMS failed: ${response.status} ${response.statusText}`
    );
  }
}

/**
 * Envía notificación de decisión de crédito al solicitante.
 * Se invoca al aprobar o rechazar una solicitud.
 */
export async function notifyCreditDecision(
  token: string,
  params: {
    solicitanteEmail: string;
    solicitudId: string;
    empresa: string;
    estado: 'aprobado' | 'rechazado';
    justificacion: string;
  }
): Promise<void> {
  const subjectPrefix = params.estado === 'aprobado' ? '✅ Aprobada' : '❌ Rechazada';

  await sendEmail(token, {
    to: params.solicitanteEmail,
    subject: `${subjectPrefix} — Solicitud ${params.solicitudId}`,
    template: 'credit-decision',
    data: {
      empresa: params.empresa,
      solicitudId: params.solicitudId,
      estado: params.estado,
      justificacion: params.justificacion,
    },
  });
}
