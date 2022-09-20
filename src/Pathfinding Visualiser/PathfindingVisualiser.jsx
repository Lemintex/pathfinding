import React, {Component} from 'react';
import Cell from './Cell/Cell';

import './PathfindingVisualiser.css';

export default class PathfindingVisualiser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: []
        };
    }

    componentDidMount() {
        let rows = 20;
        let cols = 30;
        let grid = [];
        for (let i = 0; i < rows; i++) {
            var currentRow = [];
            for (let j = 0; j < cols; j++) {
                currentRow.push([]);                
            }
            grid.push(currentRow);
        }
        this.setState({grid});
    }

    render() {
        let {grid} = this.state;
        console.log(grid);
        return (
            <div className='grid'>
                {grid.map((rows, rowID) => {
                    return <div>
                        {rows.map((cell, cellID) => <Cell></Cell>)}
                    </div>
                })}
            </div>
        );
    }
}