<?php
// Updated: 2026-03-16

function get_mailer($config) {
    if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        $autoloadPath = __DIR__ . '/vendor/autoload.php';

        if (file_exists($autoloadPath)) {
            require_once $autoloadPath;
        } else {
            send_response('Composer autoload not found in api/vendor.', 500);
        }
    }

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['smtpHost'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtpUser'];
    $mail->Password = $config['smtpPassword'];
    $mail->SMTPSecure = $config['smtpSecure'];
    $mail->Port = (int) $config['smtpPort'];
    $mail->setFrom($config['smtpFromEmail'], $config['smtpFromName']);

    return $mail;
}
