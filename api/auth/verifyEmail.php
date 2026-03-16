<?php
include '../setup.php';

$token = $_GET['token'] ?? '';
$status = 'error';
$message = 'Verification failed.';

if ($token === '') {
    $message = 'Verification token is missing.';
} else {
    $stmt = $mysqli->prepare('SELECT id, verify_token_exp FROM users WHERE verify_token = ? LIMIT 1');
    $stmt->bind_param('s', $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result ? $result->fetch_assoc() : null;

    if (!$user) {
        $message = 'Verification token is invalid.';
    } elseif ($user['verify_token_exp'] && strtotime($user['verify_token_exp']) < time()) {
        $message = 'Verification token has expired.';
    } else {
        $update = $mysqli->prepare('UPDATE users SET is_verified = 1, verify_token = NULL, verify_token_exp = NULL WHERE id = ?');
        $update->bind_param('i', $user['id']);
        $update->execute();
        $status = 'success';
        $message = 'Your email has been verified. You can now sign in.';
    }
}

header('Content-Type: text/html; charset=utf-8');
$appUrl = rtrim($config['appUrl'] ?? '', '/');
$logoUrl = $appUrl !== '' ? $appUrl . '/images/favicon.png' : '';
$cta = $appUrl !== '' ? '<a href="' . $appUrl . '/login" style="display:inline-block;margin-top:12px;padding:12px 20px;background:#f05f4f;color:#1b1814;text-decoration:none;border-radius:12px;font-weight:bold;">Go to login</a>' : '';

echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Email verification</title></head>';
echo '<body style="margin:0;background:#f6f1ec;font-family:Arial,Helvetica,sans-serif;color:#2c2420;">';
echo '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding:32px 16px;">';
echo '<tr><td align="center">';
echo '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;background:#ffffff;border-radius:18px;box-shadow:0 18px 30px rgba(15,23,42,0.12);overflow:hidden;">';
echo '<tr><td style="padding:28px;">';
echo '<div style="display:flex;align-items:center;gap:12px;">';
if ($logoUrl !== '') {
    echo '<img src="' . $logoUrl . '" alt="GanttManager" width="36" height="36" style="border-radius:10px;display:block;" />';
}
echo '<div><p style="margin:0;font-size:18px;font-weight:bold;">GanttManager</p><p style="margin:4px 0 0;font-size:12px;color:#8a8177;letter-spacing:1px;text-transform:uppercase;">Student Planning Suite</p></div></div>';
echo '<h1 style="margin:24px 0 10px;font-size:22px;">Email verification</h1>';
echo '<p style="margin:0 0 12px;font-size:14px;color:#6b635b;">' . $message . '</p>';
if ($status === 'success') {
    echo $cta;
}
echo '</td></tr>';
echo '<tr><td style="padding:14px 28px 24px;background:#fff6ef;font-size:11px;color:#8a8177;">If you did not request this, you can ignore this message.</td></tr>';
echo '</table></td></tr></table></body></html>';
exit;
