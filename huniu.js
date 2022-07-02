/**
 * @description 3D场景代码注入
 **/

 function onSceneRender() {
  return {
    // 场景初始化之前
    beforeLoad: function (options) {},
    // 场景初始化完成
    loaded: function (mapInstance) {
      console.log("zh2");
      const viewer = mapInstance.viewer,
        scene = viewer.scene;
      var pointData = null;
      const s3mUrl =
        "http://10.64.64.79:8195/portalproxy/5y2gh516/iserver/services/3D-FHWA_JM/rest/realspace";
      scene.open(s3mUrl, undefined, {
        autoSetView: false, // 是否自动定位
      });
      console.log("代码注入");
      var picurl =
        "http://10.64.64.46:8185/analystrunner/project/ee062e0c-8022-4e3c-8c07-53e781145168/attach/SkyImg";
      var currentSkyBox, defaultSkyBox, qtSkyBox, ltSkyBox, wxSkyBox;
      
      
      
      scene.globe.show = true;
      //设置太阳是否开启--关闭太阳光
      scene.sun.show = false;
      // 01设置环境光的强度-新处理CBD场景
      scene.lightSource.ambientLightColor = new Cesium.Color(
        0.75,
        0.75,
        0.75,
        1
      );
      //01新处理CBD场景
      // 添加光源
      // 东南45方向主光源
      var position1 = new Cesium.Cartesian3.fromDegrees(
        114.27448,
        30.46107,
        450
      );
      //光源方向点
      //CBD中设置为湖中亭子顶部
      var targetPosition1 = new Cesium.Cartesian3.fromDegrees(
        114.17448,
        30.46107,
        450
      );
      var dirLightOptions = {
        targetPosition: targetPosition1,
        color: new Cesium.Color(1.0, 1.0, 1.0, 1),
        // color: new Cesium.Color(1.0, 1.0, 1.0, 1),
        intensity: 0.5,
      };
      var directionalLight_1 = new Cesium.DirectionalLight(
        position1,
        dirLightOptions
      );
      scene.addLightSource(directionalLight_1);
      //开启颜色校正
      //   viewer.scene.colorCorrection.show = true;
      //   viewer.scene.colorCorrection.saturation = 1;
      //   viewer.scene.colorCorrection.brightness = 1.2;
      //   viewer.scene.colorCorrection.contrast = 1.1;
      //   viewer.scene.colorCorrection.hue = 0;
      //   scene.camera.defaultZoomAmount = 10;
      ltSkyBox = new Cesium.SkyBox({
        sources: {
          positiveX: picurl + "/SkyImg/蓝天/Right.jpg",
          negativeX: picurl + "/SkyImg/蓝天/Left.jpg",
          positiveY: picurl + "/SkyImg/蓝天/Front.jpg",
          negativeY: picurl + "/SkyImg/蓝天/Back.jpg",
          positiveZ: picurl + "/SkyImg/蓝天/Up.jpg",
          negativeZ: picurl + "/SkyImg/蓝天/Down.jpg",
        },
      });
      qtSkyBox = new Cesium.SkyBox({
        sources: {
          positiveX: picurl + "/SkyImg/晴天/Right.jpg",
          negativeX: picurl + "/SkyImg/晴天/Left.jpg",
          positiveY: picurl + "/SkyImg/晴天/Front.jpg",
          negativeY: picurl + "/SkyImg/晴天/Back.jpg",
          positiveZ: picurl + "/SkyImg/晴天/Up.jpg",
          negativeZ: picurl + "/SkyImg/晴天/Down.jpg",
        },
      });
      wxSkyBox = new Cesium.SkyBox({
        sources: {
          positiveX: picurl + "/SkyImg/晚霞/Right.jpg",
          negativeX: picurl + "/SkyImg/晚霞/Left.jpg",
          positiveY: picurl + "/SkyImg/晚霞/Front.jpg",
          negativeY: picurl + "/SkyImg/晚霞/Back.jpg",
          positiveZ: picurl + "/SkyImg/晚霞/Up.jpg",
          negativeZ: picurl + "/SkyImg/晚霞/Down.jpg",
        },
      });
      defaultSkyBox = ltSkyBox;
      currentSkyBox = defaultSkyBox;
      scene.skyBox = currentSkyBox;
      //旋转速度
      currentSkyBox.WSpeed = 5.0;
      scene.skyAtmosphere.show = false;

      class UGISExt {
        constructor(mapInstance) {
          this.mapInstance = mapInstance;
          this.viewer = mapInstance.viewer;
          //数据源的新增类别
          this.sourcea = [
            "其他",
            "医疗机构",
            "警力资源",
            "物联设备",
            "社区事件",
          ];
          this.addDatasources(this.sourcea);
          this.viewer.dataSources._dataSources.forEach((source) => {
            if (source.name != "其他"&&source.name != "社区事件") {
              source.show = false;
            }
          });

          this.handler = null;
          this.select = [];
          
          var poiintcenter = [114.175530922566, 30.4621443205035];
          var radius = 0.0001;
          var options = {
            steps: 30,
            units: "kilometers",
          };
          var circle = turf.circle(poiintcenter, radius, options);
          this.addPolygon(circle.geometry.coordinates[0]);
        }
        initEvent(callback) {
          this.handler = new Cesium.ScreenSpaceEventHandler(
            this.viewer.scene.canvas
          );
          this.handler.setInputAction((movement) => {
            let pos = this.viewer.scene.pickPosition(movement.position);
            let pick = this.viewer.scene.pick(movement.position);
            if (pick && pick.id) {
              callback(pick.id);
            } else {
              callback("null");
            }
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        }
        addDatasources(types) {
          types.forEach((item) => {
            let hasSource = this.viewer.dataSources._dataSources.find(
              (datasource) => {
                return datasource.name == item;
              }
            );

            if (!hasSource) {
              this.viewer.dataSources.add(new Cesium.CustomDataSource(item));
            }
          });
        }
        getSoucetype(type) {
          let url, souce;
          if (type == "医疗机构") {
            souce = this.viewer.dataSources._dataSources.find((datasource) => {
              return datasource.name == "医疗机构";
            });
            url =
              "http://10.64.64.46:8185/ugis/public/rs/file/getFile.json?id=625b508e82d64747a3f524f5256db9f2.png";
          } else if (type == "警力资源") {
            url =
              "http://10.64.64.46:8185/ugis/public/rs/file/getFile.json?id=952158b1c7e4432285f157c5fa64efc8.png";
            souce = this.viewer.dataSources._dataSources.find((datasource) => {
              return datasource.name == "警力资源";
            });
          } else if (type == "物联设备") {
            url =
              "http://10.64.64.46:8185/ugis/public/rs/file/getFile.json?id=48498d702ab547b6a21df2cf0bae9b80.png";
            souce = this.viewer.dataSources._dataSources.find((datasource) => {
              return datasource.name == "物联设备";
            });
          } else if (type == "社区事件") {
            url =
              "http://10.64.64.46:8185/ugis/public/rs/file/getFile.json?id=9f7830411b9e4482a7a5402fc32bb861.png";
            souce = this.viewer.dataSources._dataSources.find((datasource) => {
              return datasource.name == "社区事件";
            });

            /*新增类别
                                  else if(type=='社区事件'){  类别名称
                                    url='http://116.63.168.191:8184/ugis/public/rs/file/getFile.json?id=e1c491e7cd894fa19e59b29a258e493f.png'  icon地址
                                     souce= this.viewer.dataSources._dataSources.find(
                                     datasource => {
                                     return datasource.name == '社区事件' 类别名称
                                  });*/
          }
          return { url: url, souce: souce };
        }
        addbill(data,bol) {
          if(!bol){
            pointData = data;
          }
          
          this.viewer.dataSources._dataSources.forEach((source) => {
            if (source.name != "其他"&&source.name != "社区事件") {
              source.entities.removeAll();
            }
          });
          console.log("----------添加数据bill---------");
          data.forEach((item) => {
            let obj = this.getSoucetype(item.type);
            let Hassouce = obj.souce;
            let url = obj.url;
            let pos = this.viewer.scene.getHeight(item.lon, item.lat);
            Hassouce.entities.add({
              position: Cesium.Cartesian3.fromDegrees(item.lon, item.lat, 20),
              billboard: {
                image: url,
                sizeInMeters:true,
                // pixelOffset: new Cesium.Cartesian2(0, -66),
                // pixelOffsetScaleByDistance :new Cesium.NearFarScalar(1.5e2, 0.0, 8.0e6, 10.0)
                horizontalOrigin :Cesium.HorizontalOrigin.CENTER,
                verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
                //disableDepthTestDistance :Number.POSITIVE_INFINITY,
                scale :0.1
                //ClassificationType:Cesium.ClassificationType.CESIUM_3D_TILE
              },
              name: item.name,
              propertise: item.propertise,
            });
          });
        }

        resetData() {
          var lat = Number($("#txt_a1649498052077326").widget().currentValue);
          var lon = Number($("#txt_a1649498054398327").widget().currentValue);
          var dis = Number($("#txte_a1648625683365224").widget().currentValue);
          if (dis === "") return;
          var center = turf.point([lon, lat]);
          var options = { units: "kilometers" };
          var data = [];
          pointData.forEach((point) => {
            var to = turf.point([point.lon, point.lat]);
            var distance = turf.rhumbDistance(center, to, options);
            if (distance < dis) {
              data.push(point);
            }
          });
          this.addbill(data,true);

          var poiintcenter = [lon, lat];
          var radius = dis;
          var options = {
            steps: 30,
            units: "kilometers",
            properties: { foo: "bar" },
          };
          var circle = turf.circle(poiintcenter, radius, options);
          this.addPolygon(circle.geometry.coordinates[0]);
        }
        addOtherPoint(coord){
          var source = this.viewer.dataSources._dataSources.find(
            (datasource) => {
              return datasource.name == "社区事件";
            }
          );
          source.entities.removeAll();
          let obj = this.getSoucetype('社区事件');
            let Hassouce = obj.souce;
            let url = obj.url;
            Hassouce.entities.add({
              position: Cesium.Cartesian3.fromDegrees(Number(coord[0]), Number(coord[1]), 20),
              billboard: {
                image: url,
                sizeInMeters:true,
                // pixelOffset: new Cesium.Cartesian2(0, -66),
                // pixelOffsetScaleByDistance :new Cesium.NearFarScalar(1.5e2, 0.0, 8.0e6, 10.0)
                horizontalOrigin :Cesium.HorizontalOrigin.CENTER,
                verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
                //disableDepthTestDistance :Number.POSITIVE_INFINITY,
                scale :0.1
                //ClassificationType:Cesium.ClassificationType.CESIUM_3D_TILE
              },
              name: '事件点位',
              propertise: null,
            });
            // this.clearstyle();
            // this.changeStyle('事件点位');
            this.flyTo('事件点位');
        }
        clearOtherPoint(){
          var source = this.viewer.dataSources._dataSources.find(
            (datasource) => {
              return datasource.name == "社区事件";
            }
          );
          source.entities.removeAll();
        }
        clearPolygon(){
          var source = this.viewer.dataSources._dataSources.find(
            (datasource) => {
              return datasource.name == "其他";
            }
          );
          source.entities.removeAll();
          this.addbill(pointData);
        }
        addPolygon(coordinates) {
          var source = this.viewer.dataSources._dataSources.find(
            (datasource) => {
              return datasource.name == "其他";
            }
          );
          source.entities.removeAll();
          if(!coordinates) return;
          var positions = [];
          coordinates.forEach((coord) => {
            positions.push(coord[0]);
            positions.push(coord[1]);
          });
         
          console.log('已添加')
          source.entities.add({
            polygon: {
              // 获取指定属性（positions，holes（图形内需要挖空的区域））
              hierarchy: {
                positions: Cesium.Cartesian3.fromDegreesArray(positions),
              },
              // 边框
              outline: true,
              // 边框颜色
              outlineColor: new Cesium.Color(1.0, 1.0, 1.0, 1),
              // 边框尺寸
              outlineWidth: 3,
              // 填充的颜色，withAlpha透明度
              material: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
              // 是否被提供的材质填充
              fill: true,
              height:10
            },
          });
        }

        changeStyle(name) {
          this.clearstyle();
          this.sourcea.forEach((souce) => {
            let hasSource = this.viewer.dataSources._dataSources.find(
              (datasource) => {
                return datasource.name == souce;
              }
            );
            hasSource.entities.values.forEach((item) => {
              if (item.name == name) {
                let i = 0;
                item.billboard.show = new Cesium.CallbackProperty(function () {
                  i = 0.1 + i;
                  let dd = Math.sin(i);
                  if (dd > 0) return true;
                  return false;
                }, false);
                this.select.push(item.name);
              }
            });
          });
        }
        clearstyle() {
          this.sourcea.forEach((souce) => {
            let hasSource = this.viewer.dataSources._dataSources.find(
              (datasource) => {
                return datasource.name == souce;
              }
            );
            this.select.forEach((se) => {
              hasSource.entities.values.forEach((item) => {
                if (item.name == se) {
                  item.billboard.show = true;
                }
              });
            });
          });
        }
        //弹窗点击飞到并闪
        flyTo(name) {
          this.sourcea.forEach((souce) => {
            let hasSource = this.viewer.dataSources._dataSources.find(
              (datasource) => {
                return datasource.name == souce;
              }
            );
            hasSource.entities.values.forEach((item) => {
              if (item.name == name) {
                this.viewer.flyTo(item);
                this.clearstyle();
                this.changeStyle(item.name);
              }
            });
          });
        }
        showSouce(names, bol) {
          names.forEach((item) => {
            let souce = this.viewer.dataSources._dataSources.find(
              (datasource) => {
                return datasource.name == item;
              }
            );
            if (souce) {
              souce.show = bol;
            }
          });
          ugsiExten.viewer.camera.flyTo({//"114.175775167987", "30.4621443205066""114.175775168255", "30.4618833344527"
            destination : Cesium.Cartesian3.fromDegrees(114.175775168255,30.4618833344527, 300.0)
            });
        }
        changeSkyBox(type) {
          if (type == "lt") {
            ltSkyBox.WSpeed = 5.0;
            scene.skyBox = ltSkyBox;
          } else if (type == "qt") {
            qtSkyBox.WSpeed = 5.0;
            scene.skyBox = qtSkyBox;
          } else if (type == "wx") {
            wxSkyBox.WSpeed = 5.0;
            scene.skyBox = wxSkyBox;
          }
        }
      }
      window.ugsiExten = new UGISExt(mapInstance);
      console.log(ugsiExten, "ugsiExten");
      window.ugsiExten.initEvent((e) => {
        window.ugsiExten.changeStyle(e.name);
      });
    },
  };
}