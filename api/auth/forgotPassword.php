<?php
include '../setup.php';
include '../mailer.php';

$email = trim($receivedData['email'] ?? '');
if ($email === '') {
    send_response('Email is required', 400);
}

$stmt = $mysqli->prepare('SELECT id, screen_name FROM users WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result ? $result->fetch_assoc() : null;

if ($user) {
    $token = bin2hex(random_bytes(32));
    $exp = date('Y-m-d H:i:s', strtotime('+1 hour'));
    $update = $mysqli->prepare('UPDATE users SET reset_token = ?, reset_token_exp = ? WHERE id = ?');
    $update->bind_param('ssi', $token, $exp, $user['id']);
    $update->execute();

    $link = rtrim($config['appUrl'], '/') . '/reset-password?token=' . $token;

    try {
        $mail = get_mailer($config);
        $mail->addAddress($email, $user['screen_name']);
        $mail->Subject = 'Reset your GanttManager password';
        $mail->Body = "Reset your password using this link: $link";
        $mail->send();
    } catch (Exception $e) {
        log_info('Mailer error: ' . $e->getMessage());
    }
}

send_response('If the email exists, a reset link has been sent.');
