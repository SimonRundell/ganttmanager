<?php
include '../setup.php';

$user = require_auth($config, $mysqli);

if (!isset($_FILES['avatar'])) {
    send_response('Avatar file is required', 400);
}

$file = $_FILES['avatar'];
$maxBytes = (int) ($config['avatarMaxBytes'] ?? 10485760);
if ($file['size'] > $maxBytes) {
    send_response('Avatar is too large', 400);
}

$allowed = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/gif' => 'gif'
];

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
if (!isset($allowed[$mime])) {
    send_response('Invalid file type', 400);
}

$ext = $allowed[$mime];
$filename = 'avatar_' . $user['id'] . '_' . time() . '.' . $ext;
$target = __DIR__ . '/../uploads/avatars/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $target)) {
    send_response('Upload failed', 500);
}

$relative = 'uploads/avatars/' . $filename;
$stmt = $mysqli->prepare('UPDATE users SET avatar_path = ? WHERE id = ?');
$stmt->bind_param('si', $relative, $user['id']);
$stmt->execute();

send_response(['avatar_path' => $relative]);
