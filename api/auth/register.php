<?php
include '../setup.php';
include '../mailer.php';

$screenName = trim($receivedData['screen_name'] ?? '');
$email = trim($receivedData['email'] ?? '');
$password = $receivedData['password'] ?? '';

if ($screenName === '' || $email === '' || $password === '') {
    send_response('All fields are required', 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_response('Invalid email address', 400);
}

if (strlen($password) < 6) {
    send_response('Password must be at least 6 characters', 400);
}

$stmt = $mysqli->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
if ($stmt->get_result()->fetch_assoc()) {
    send_response('Email already registered', 400);
}

$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
$token = bin2hex(random_bytes(32));
$exp = date('Y-m-d H:i:s', strtotime('+1 day'));

$insert = $mysqli->prepare('INSERT INTO users (email, password_hash, screen_name, role, verify_token, verify_token_exp) VALUES (?, ?, ?, "student", ?, ?)');
$insert->bind_param('sssss', $email, $hash, $screenName, $token, $exp);
if (!$insert->execute()) {
    send_response('Unable to create user', 500);
}

$link = rtrim($config['appUrl'], '/') . '/verify-email?token=' . $token;

try {
    $mail = get_mailer($config);
    $mail->addAddress($email, $screenName);
    $mail->Subject = 'Verify your GanttManager account';
    $mail->Body = "Welcome to GanttManager. Verify your email using this link: $link";
    $mail->send();
} catch (Exception $e) {
    log_info('Mailer error: ' . $e->getMessage());
}

send_response('Registration successful. Check your email to verify.', 201);
