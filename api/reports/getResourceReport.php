<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($_GET['projectId'] ?? 0);

if ($projectId <= 0) {
    send_response('Project ID required', 400);
}

require_project_access($mysqli, $user, $projectId);

$sql = 'SELECT r.id, r.name, r.role, r.cost_rate, tr.allocation, t.title AS task_title FROM resources r LEFT JOIN task_resources tr ON r.id = tr.resource_id LEFT JOIN tasks t ON tr.task_id = t.id WHERE r.project_id = ? ORDER BY r.name';
$stmt = $mysqli->prepare($sql);
$stmt->bind_param('i', $projectId);
$stmt->execute();
$result = $stmt->get_result();

$resources = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $resources[] = $row;
    }
}

send_response(['resources' => $resources]);
