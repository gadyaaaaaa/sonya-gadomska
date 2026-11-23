<?php
// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
define('REMAINABLE_MUSE_LIBRARY',true);
require __DIR__.'/../public/api/muse.php';
function rejects(callable $fn): void {try {$fn();} catch (Throwable $e) {return;} throw new Exception('Invalid payload accepted');}
rejects(function(){remainable_input(['consent'=>false]);});
rejects(function(){remainable_input(['consent'=>true,'building'=>[],'photos'=>[['id'=>'1','src'=>'https://example.com/x.jpg']]]);});
rejects(function(){remainable_input(['consent'=>true,'building'=>[],'photos'=>[['id'=>'1','src'=>'data:image/png;base64,AAAA']]]);});
$r=['evidenceStatus'=>'insufficient','evidenceReason'=>'No usable image.','photoRequests'=>[['what'=>'Whole building','why'=>'Identify the building','angle'=>'Wide exterior view from a cleared location','category'=>'exterior']],'informationRequests'=>['Country'],'summary'=>'Limited visible evidence.','observations'=>[],'concerns'=>[],'nonStructural'=>[],'missing'=>['More photos'],'actions'=>['Professional review'],'limitations'=>['Preliminary only']];
remainable_validate($r,['real-1']);
rejects(function()use($r){$r['summary']='This building is structurally sound.';remainable_validate($r,['real-1']);});
rejects(function()use($r){$r['observations']=[['imageId'=>'invented']];remainable_validate($r,['real-1']);});
echo "Gateway validation checks passed.\n";
