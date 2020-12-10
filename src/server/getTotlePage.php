<?
    
    // 接收前端传来的参数，这些参数都是影响分页器渲染的
    $one = $_GET['cat_one'];
    $two = $_GET['cat_two'];
    $three = $_GET['cat_three'];
    $pagesize = $_GET['pagesize'];

    // 判断如果是all表示是默认的，不用渲染下面的列表，如果不是all，则拿到当前选中的cat_one的值（点击哪一个了）
    // 准备sql语句
    $sql = "SELECT * FROM `goods`";
    if($one != "all") $sql .= " WHERE `cat_one_id`='$one'";
    if($two != "all") $sql .= " AND `cat_two_id`='$two'";
    if($three != "all") $sql .= " AND `cat_three_id`='$three'";


    // 查询数据库，找到有多少种分类就可以了
    $link = mysqli_connect('localhost','root','root','huawei');
    $res = mysqli_query($link,$sql);
    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);

    // 返回结果给前端。
    // 我应该一共返回几页，根据每页多少条
    // 总数除每页的条数向上取整
    $total = ceil(count($data) / $pagesize);
    // $total表示后端应该返回几页
    echo json_encode(array(
        'message' => '获取总页数成功',
        "code" => 1,
        "total" => $total,
        '$sql' => $sql
    ));

?>