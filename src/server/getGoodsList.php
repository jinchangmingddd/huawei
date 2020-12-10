<?php
    // 1.接收前端传递过来的参数
    $one = $_GET['cat_one'];
    $two = $_GET['cat_two'];
    $three = $_GET['cat_three'];
    $method = $_GET['sort_method'];
    $type = $_GET['sort_type'];
    $current = $_GET['current'];
    $pagesize = $_GET['pagesize'];


    // 2.组装sql语句
    $sql = "SELECT * FROM `goods`";
    // 添加筛选条件
    if($one != 'all') $sql .= " WHERE `cat_one_id` = '$one'";
    if($two != 'all') $sql .= " AND `cat_two_id`='$two'";
    if($three != 'all') $sql .= " AND `cat_three_id`='$three'";
    // 确定排序方式
    // 如果是综合，就按照id排序
    if($method == '综合') $sql .= " ORDER BY  `goods_id`  $type";
    if($method == '价格') $sql .= " ORDER BY  `goods_price`  $type";

    // 确定拿哪一条数据
    // 确定好了一页12条$pagesize
    /*第一 页  0          12
    第二页  12         12 
    第三页  24         12 */

    // （当前 - 1） * 一页几条
    $start = ($current - 1) * $pagesize;

    $sql .= " LIMIT $start, $pagesize";
    

    // 3.操作数据库进行查询
    $link = mysqli_connect('localhost','root','root','huawei');
    $res = mysqli_query($link,$sql);
    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);
    // 4.將结果返回给前端
    echo json_encode(array(
        "message" => "获取商品列表信息成功",
        "current" => $current,
        "code" => 1,
        'list' => $data,
        "sql" => $sql
    ));
?>