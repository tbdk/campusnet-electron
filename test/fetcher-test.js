import {download, downloadFile, newestVersionExists} from '../app/campusnet/downloader';
import CampusNetClient from '../app/campusnet/campusnet-client';
import {xmlParser, getFilesFromXML, getModifiedDate} from '../app/campusnet/xmlParser';
import Promise from 'bluebird';
import path from 'path';

describe('CampusNet Client', function() {

  it('should login fetcher', function(done) {
    let client = new CampusNetClient('s144448', 'wBA49deM');
    client.login()
      .then(() => download(client))
      .then(() => done());
  });

  // it('should download one file', function(done) {
  //   let client = new CampusNetClient('s144448', 'wBA49deM');
  //   client.login()
  //     .then(() => {
  //       return downloadFile(client, "495445", {
  //         id: "3902993",
  //         path: ["Materials", "AlgorithmDesign.pdf"],
  //         modifiedDate: new Date(10)
  //       });
  //     })
  //     .then(() => {
  //       done();
  //     })
  // });

  it('should newest', function(done) {
    newestVersionExists(
      "/Users/tmpethick/Developer/projects/currentprojects/campusnet-electron/src/downloads/Materials/AlgorithmDesign.pdf",
      new Date(1)
    ).then(() => {
      done();
    })
  });

  it('should parse element file xml', function() {
    let $ = xmlParser(`<Folder Id="928227" Name="Top" Created="2015-07-31T18:25:38.533" MayUpload="false">
    <Folder Id="931817" Name="Materials" Created="2015-08-13T09:35:21.43" MayUpload="false">
      <File Id="4003427" Name="Algorithm Design - 13-7 - Kleinberg and Tardos.pdf">
        <FileVersion Version="1" KbSize="165" Created="2015-11-16T10:23:34.08" CreatorId="71684" Note="Kleinberg and Tardos, section 13.7. &#xD;&#xA;Randomized nearest neighbor algorithm"/>
      </File>
      <File Id="3902993" Name="AlgorithmDesign.pdf">
        <FileVersion Version="1" KbSize="483" Created="2014-11-20T21:47:27" CreatorId="71684" Note="Kleinberg and Tardos, Algorithm Design, part of chapter on randomized algorithms"/>
      </File>
      <File Id="3946990" Name="AlgorithmDesign6.pdf">
        <FileVersion Version="1" KbSize="307" Created="2015-09-15T13:06:30.273" CreatorId="71684" Note="Algorithm Design by Kleinberg and Tardos, section about sequence alignment."/>
      </File>
    </Folder>
    <Folder Id="928228" Name="Student folder" Created="2015-07-31T18:25:38.533" MayUpload="true" Note="Autogenereret mappe som de studerende kan uploade i / Autogenerated folder that students can upload to"/></Folder>`);
    const g = getFilesFromXML($);
    const value = g.next().value;
    expect(value).to.have.property('id', '4003427');
    expect(value).to.have.property('path')
    expect(value.path.toArray()).to.deep.equals(['Materials', 'Algorithm Design - 13-7 - Kleinberg and Tardos.pdf']);
    expect(g.next().done).to.be.false;
    expect(g.next().done).to.be.false;
    expect(g.next().done).to.be.true;
  })

it('should getModifedDate', function() {
    let $ = xmlParser(`<File Id="4003427" Name="Algorithm Design - 13-7 - Kleinberg and Tardos.pdf">
        <FileVersion Version="1" KbSize="165" Created="2015-11-16T10:23:34.08" CreatorId="71684" Note="Kleinberg and Tardos, section 13.7. &#xD;&#xA;Randomized nearest neighbor algorithm"/>
      </File>`);
    const date = getModifiedDate($('File').get(0));
    expect(date).to.be.an.instanceof(Date);
    expect(date.valueOf()).to.equal(1447669414080);
})

});
