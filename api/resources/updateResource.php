<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$resourceId = (int) ($receivedData['id'] ?? 0);
$projectId = (int) ($receivedData['project_id'] ?? 0);
$name = trim($receivedData['name'] ?? '');
$role = trim($receivedData['role'] ?? '');
$rate = $receivedData['cost_rate'] ?? null;
$notes = trim($receivedData['notes'] ?? '');

if ($resourceId <= 0 || $projectId <= 0) {
    send_response('Resource and project IDs required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('UPDATE resources SET name = ?, role = ?, cost_rate = ?, notes = ? WHERE id = ?');
$stmt->bind_param('ssssi', $name, $role, $rate, $notes, $resourceId);
$stmt->execute();

send_response('Resource updated');
