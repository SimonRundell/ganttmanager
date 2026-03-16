<?php
include '../setup.php';

$email = trim($receivedData['email'] ?? '');
$password = $receivedData['password'] ?? '';

if ($email === '' || $password === '') {
    send_response('Email and password are required', 400);
}

$stmt = $mysqli->prepare('SELECT id, email, password_hash, screen_name, avatar_path, role, is_verified FROM users WHERE email = ? LIMIT 1');
if (!$stmt) {
    send_response('Database error', 500);
}
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result ? $result->fetch_assoc() : null;

if (!$user || !password_verify($password, $user['password_hash'])) {
    send_response('Invalid credentials', 401);
}

if ((int) $user['is_verified'] !== 1) {
    send_response('Email not verified', 403);
}

$jwt = create_jwt((int) $user['id'], $config, $user['role']);
set_auth_cookie($jwt['token'], $jwt['exp']);

send_response([
    'user' => [
        'id' => (int) $user['id'],
        'email' => $user['email'],
        'screen_name' => $user['screen_name'],
        'avatar_path' => $user['avatar_path'],
        'role' => $user['role']
    ],
    'tokenExpires' => $jwt['exp']
]);
