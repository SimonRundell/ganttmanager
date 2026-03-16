<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$milestoneId = (int) ($receivedData['id'] ?? 0);
$projectId = (int) ($receivedData['project_id'] ?? 0);
$title = trim($receivedData['title'] ?? '');
$target = $receivedData['target_date'] ?? null;
$status = $receivedData['status'] ?? 'planned';

if ($milestoneId <= 0 || $projectId <= 0) {
    send_response('Milestone and project IDs required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('UPDATE milestones SET title = ?, target_date = ?, status = ? WHERE id = ?');
$stmt->bind_param('sssi', $title, $target, $status, $milestoneId);
$stmt->execute();

send_response('Milestone updated');
