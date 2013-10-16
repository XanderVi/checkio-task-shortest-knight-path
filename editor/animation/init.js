//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            var canvas = new ShortKnightPathCanvas(checkioInput);
            canvas.createCanvas($content.find(".explanation")[0]);
            canvas.startAnimation(explanation);


            this_e.setAnimationHeight($content.height() + 60);

        });

       

        var colorOrange4 = "#F0801A";
        var colorOrange3 = "#FA8F00";
        var colorOrange2 = "#FAA600";
        var colorOrange1 = "#FABA00";

        var colorBlue4 = "#294270";
        var colorBlue3 = "#006CA9";
        var colorBlue2 = "#65A1CF";
        var colorBlue1 = "#8FC7ED";

        var colorGrey4 = "#737370";
        var colorGrey3 = "#9D9E9E";
        var colorGrey2 = "#C5C6C6";
        var colorGrey1 = "#EBEDED";

        var colorWhite = "#FFFFFF";

        function ShortKnightPathCanvas(dataInput) {
            var zx = 20;
            var zy = 10;
            var cellSize = 30;
            var cellN = 8;
            var fullSizeX = zx * 1.5 + cellSize * cellN;
            var fullSizeY = zy * 3 + cellSize * cellN;
            var delay = 200;

            var colorDark = "#294270";
            var colorBlue = "#65A1CF";
            var colorOrange = "#FABA00";
            var colorDarkOrange = "#FA8F00";

            var letters = "abcdefgh";

            var attrRectWhite = {"stroke": colorDark, "stroke-width": 1.5};
            var attrRectBlack = {"stroke": colorDark, "stroke-width": 1.5, "fill": colorBlue};
            var attrRectOrange = {"fill": colorOrange};
            var attrRectBlackOrange = {"fill": colorDarkOrange};

            var attrText = {"stroke": colorDark, "font-size": 16, "font-family": "Verdana"};

            var paper;
            var start = [7 - letters.indexOf(dataInput[0]), parseInt(dataInput[1]) - 1];
            var end = [7 - letters.indexOf(dataInput[3]), parseInt(dataInput[4]) - 1];
            var knight;

            this.createCanvas = function (dom) {
                paper = Raphael(dom, fullSizeX, fullSizeY, 0, 0);
                for (var i = 0; i < cellN; i++) {
                    for (var j = 0; j < cellN; j++) {
                        var r = paper.rect(zx + cellSize * j,
                                zy + cellSize * i,
                                cellSize,
                                cellSize).attr(
                                (i + (j % 2)) % 2 ? attrRectBlack : attrRectWhite
                            );
                        if ((i == start[0] && j == start[1]) || (i == end[0] && j == end[1])) {
                            r.attr((i + (j % 2)) % 2 ? attrRectBlackOrange : attrRectOrange);
                        }
                    }
                    paper.text(zx + cellSize * i + cellSize / 2,
                        2 * zy + cellSize * cellN,
                        String(i + 1)
                    ).attr(attrText);
                    paper.text(zx / 2,
                        fullSizeY - zy * 2 - cellSize / 2 - cellSize * i,
                        letters[i]
                    ).attr(attrText);
                }
//                knight = paper.image("icon-knight.png",
//                    zx + padding + start[1] * cellSize,
//                    zy + padding + start[0] * cellSize,
//                    cellSize - 2 * padding, cellSize - 2 * padding);
                knight = paper.text(
                    zx + start[1] * cellSize + cellSize / 2,
                    zy + start[0] * cellSize + cellSize / 2,
                    "\u265E").attr({"font-size": 28});

            };
            this.startAnimation = function (expl) {
                for (var k = 0; k < expl.length; k++) {

                    setTimeout(function () {
                        var move = expl[k];
                        return function () {
                            knight.animate({"transform": "...t" + cellSize * move[1] + ",0"}, delay * Math.abs(move[1]));
                        }
                    }(),
                        delay * 5 * k);
                    setTimeout(function () {
                        var move = expl[k];
                        return function () {
                            knight.animate({"transform": "...t0," + (-1) * cellSize * move[0]}, delay * Math.abs(move[0]));
                        }
                    }(),
                        delay * 5 * k + delay * Math.abs(expl[k][1]) + 50);
                }
            }
        }


    }
);
