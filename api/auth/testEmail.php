<?php
include '../setup.php';
include '../mailer.php';

$user = require_auth($config, $mysqli);
$email = trim($receivedData['email'] ?? '');

if ($email === '') {
    $email = $user['email'];
}

if ($email !== $user['email'] && !in_array($user['role'], ['teacher', 'admin'], true)) {
    send_response('Forbidden', 403);
}

try {
    $mail = get_mailer($config);
    $mail->addAddress($email);
    $mail->Subject = 'GanttManager SMTP test';
    $mail->Body = 'This is a test email from GanttManager.';
    $mail->send();
} catch (Exception $e) {
    log_info('Mailer error: ' . $e->getMessage());
    send_response('Email failed: ' . $e->getMessage(), 500);
}

send_response('Test email sent');
