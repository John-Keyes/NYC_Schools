import {cleanup} from '@testing-library/react';
import "jest-dom/extend-expect";
import renderer from "react-test-renderer";
import RenderItem from '../RenderItem';

afterEach(cleanup);

test("RenderItem renders without crashing", () => {
    const div = document.createElement("div"); 
    ReactDom.render(<RenderItem/>, div);
});

test("RenderItem matches snapshot?", () => {
    const tree = renderer.create(
        <RenderItem 
            item={{
                dbn: 95340,
                schoolName: "Test School",
                overview: "Overview",
                neighborhood: "The Street",
                location: "The Location",
                numOfSATakers: 127,
                readingAvg: 584,
                mathAvg: 843,
                writingAvg: 1032
            }}
        />
    );
    expect(tree).toMatchSnapshot();
});