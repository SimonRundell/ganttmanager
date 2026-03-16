<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($receivedData['project_id'] ?? 0);
$name = trim($receivedData['name'] ?? '');
$role = trim($receivedData['role'] ?? '');
$rate = $receivedData['cost_rate'] ?? null;
$notes = trim($receivedData['notes'] ?? '');

if ($projectId <= 0 || $name === '') {
    send_response('Project and resource name required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('INSERT INTO resources (project_id, name, role, cost_rate, notes) VALUES (?, ?, ?, ?, ?)');
$stmt->bind_param('issss', $projectId, $name, $role, $rate, $notes);
$stmt->execute();

send_response(['resource_id' => $stmt->insert_id], 201);
