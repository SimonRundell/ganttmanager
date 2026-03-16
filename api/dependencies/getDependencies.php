<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($_GET['projectId'] ?? 0);

if ($projectId <= 0) {
    send_response('Project ID required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('SELECT * FROM dependencies WHERE project_id = ?');
$stmt->bind_param('i', $projectId);
$stmt->execute();
$result = $stmt->get_result();

$dependencies = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $dependencies[] = $row;
    }
}

send_response(['dependencies' => $dependencies]);
