
var lkModelViewer = null;

var loadModel = function (model, type) { // 加载模型（model-英雄编号，type-皮肤编号）
    var opts = {
        type: ZamModelViewer.LOL,
        container: $('#viewer'),
        aspect: 600 / 400,
        contentPath: 'resource/', // //media.services.zam.com/v1/media/byName/lol/mv/
        models: [{
            champion: model,
            skin: type
        }]
    };

    if (lkModelViewer) {
        lkModelViewer.destroy();
    }
    lkModelViewer = new ZamModelViewer(opts);
    setTimeout(updateAnimations, 100);
}

var setAnimation = function (anim) { // 设置动画
    if (lkModelViewer && anim) {
        lkModelViewer.method('setAnimation', anim);
    }
}

var updateAnimations = function () { // 更新动画
    if (lkModelViewer && lkModelViewer.method('isLoaded')) {
        var html = '';
        var numAnims = lkModelViewer.method('getNumAnimations');
        for (i = 0; i < numAnims; i++) {
            var anim = lkModelViewer.method('getAnimation', i);
            if (anim) {
                var animName = anim;
                var names = animNames.filter((o) => { return o.name == anim; });
                if (names.length > 0) {
                    animName = names[0].chinese;
                }
                html += '<button type="button" onclick="setAnimation(\'' + anim + '\')">' + animName + '</button>';
            }
        }
        $('#anims').html(html);
    }
    else {
        setTimeout(updateAnimations, 100);
    }
}

$(function () {
    var html = '';
    for (var i in champions) {
        var champion = champions[i];
        html += '<button type="button" onclick="loadModel(\'' + champion.id + '\', 0)">' + champion.title + '</button>';
    }
    $('#champions').html(html);
    $('#champions input:eq(0)').attr('checked', true);
    loadModel('1', 0);
    updateAnimations();
});
