<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$milestoneId = (int) ($receivedData['id'] ?? 0);
$projectId = (int) ($receivedData['project_id'] ?? 0);

if ($milestoneId <= 0 || $projectId <= 0) {
    send_response('Milestone and project IDs required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('DELETE FROM milestones WHERE id = ?');
$stmt->bind_param('i', $milestoneId);
$stmt->execute();

send_response('Milestone deleted');
