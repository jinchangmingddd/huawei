<?
    //不需要参数，因为一级分类打开页面就会有，直接查看数据库中一共有多少种分类，然后渲染到页面就ok

    $link = mysqli_connect('localhost','root','root','huawei');
    // 这条语句的意思是，从cat_one_one中将相同的分为一类，然后选中
    $sql = "SELECT `cat_one_id` FROM `goods` GROUP BY `cat_one_id`";

    $res = mysqli_query($link,$sql);

    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);

    // 返回结果给前端
    echo json_encode(array(
        'message' => '获取一级列表成功',
        "code" => 1,
        "list" => $data
    ));

?>