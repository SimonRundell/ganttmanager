<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);

if (is_teacher_or_admin($user)) {
    $sql = 'SELECT p.*, u.screen_name AS owner_name FROM projects p JOIN users u ON p.owner_id = u.id ORDER BY p.created_at DESC';
    $result = $mysqli->query($sql);
} else {
    $sql = 'SELECT DISTINCT p.* FROM projects p LEFT JOIN project_members m ON p.id = m.project_id WHERE p.owner_id = ? OR m.user_id = ? ORDER BY p.created_at DESC';
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ii', $user['id'], $user['id']);
    $stmt->execute();
    $result = $stmt->get_result();
}

$projects = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $projects[] = $row;
    }
}

send_response(['projects' => $projects]);
